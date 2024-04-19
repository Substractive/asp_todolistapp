namespace API.Entities;


public class ListItem
{
    public int Id { get; set; }
    public string Opis { get; set; }

    public bool InProgress { get; set; }

    public int AppListId { get; set; }

    public AppList AppList { get; set; }
}