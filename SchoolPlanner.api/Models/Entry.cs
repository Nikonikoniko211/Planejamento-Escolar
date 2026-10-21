using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace SchoolPlanner.Api.Models;

public enum EntryType
{
    Test,
    Assignment,
    Event,
    DayOff
}

public class Entry
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Title { get; set; } = "";

    [BsonRepresentation(BsonType.String)]
    public EntryType Type { get; set; }

    public DateTime Date { get; set; }
    public string? Subject { get; set; }
    public bool IsDone { get; set; }
    public string? Notes { get; set; }
}