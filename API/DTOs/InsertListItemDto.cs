using API.Entities;

namespace API.DTOs;

public class InsertListItemDto
{
    public int Id { get; set; }
    public string Opis { get; set; }

    public bool InProgress { get; set; }

    public int AppListId { get; set; }
}
