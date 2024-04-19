
namespace API.Entities;

public class AppList
{
    public int Id { get; set; }
    public string Title { get; set; }

    public string Tag { get; set; }

    public List<ListItem> ListItems { get; set; } = new();
}



