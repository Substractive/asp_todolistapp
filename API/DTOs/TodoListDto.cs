namespace API.DTOs;

public class TodoListDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Tag { get; set; }

    public List<ListItemDto> ListItems { get; set; }
}
