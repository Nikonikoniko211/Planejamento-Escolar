using System.Text.Json.Serialization;
using MongoDB.Driver;
using SchoolPlanner.Api.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IMongoClient>(new MongoClient("mongodb://localhost:27017"));
builder.Services.AddSingleton(sp =>
    sp.GetRequiredService<IMongoClient>()
      .GetDatabase("schoolplanner")
      .GetCollection<Entry>("entries"));

builder.Services.ConfigureHttpJsonOptions(o =>
    o.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

builder.Services.AddCors(o => o.AddPolicy("angular", p =>
    p.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

app.UseCors("angular");

app.MapGet("/entries", async (IMongoCollection<Entry> entries) =>
    await entries.Find(_ => true).SortBy(e => e.Date).ToListAsync());

app.MapPost("/entries", async (Entry entry, IMongoCollection<Entry> entries) =>
{
    await entries.InsertOneAsync(entry);
    return Results.Created($"/entries/{entry.Id}", entry);
});

app.MapPut("/entries/{id}", async (string id, Entry updated, IMongoCollection<Entry> entries) =>
{
    updated.Id = id;
    var result = await entries.ReplaceOneAsync(e => e.Id == id, updated);
    return result.MatchedCount == 0 ? Results.NotFound() : Results.NoContent();
});

app.MapDelete("/entries/{id}", async (string id, IMongoCollection<Entry> entries) =>
{
    var result = await entries.DeleteOneAsync(e => e.Id == id);
    return result.DeletedCount == 0 ? Results.NotFound() : Results.NoContent();
});

app.Run();