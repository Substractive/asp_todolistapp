using API.Entities;

namespace API.DTOs;

public class ListUpdateDto
{
    public int Id { get; set; }
    public string Title { get; set; }

    public string Tag { get; set; }
    public List<ListItem> ListItems { get; set; }

}
