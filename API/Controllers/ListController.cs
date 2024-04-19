using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ListController : ControllerBase
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public ListController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoListDto>>> GetList()
    {
        try
        {
            var lists = await _context.Lists.Include(l => l.ListItems).ToListAsync();

            var listsToReturn = _mapper.Map<IEnumerable<TodoListDto>>(lists);

            return Ok(listsToReturn);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                ex.Message);
        }
       
    }

    [HttpGet("{id}")] // api/
    public async Task<ActionResult<TodoListDto>> GetList(int id)
    {
        var list = await _context.Lists.Include(l => l.ListItems).FirstOrDefaultAsync(l => l.Id == id);

        return _mapper.Map<TodoListDto>(list);
    }

    [HttpPost("insert")]
    public async Task<ActionResult<AppList>> Insert(TodoListDto listDto)
    {
        var newList = new AppList
        {
            Title = listDto.Title,
            Tag = listDto.Tag
        };

        _context.Lists.Add(newList);
        await _context.SaveChangesAsync();

        return newList;
    }

    [HttpPut("update/{id:int}")]
    public async Task<ActionResult> Update(int id, ListUpdateDto listUpdateDto)
    {
        try
        {
            if (id == 0 || listUpdateDto == null)
            {
                return BadRequest(ModelState);
            }

            var list = await _context.Lists.Include(l => l.ListItems).FirstOrDefaultAsync(l => l.Id == id);

            if (list == null) return NotFound();

            _mapper.Map(listUpdateDto, list);

            _context.Lists.Update(list);
            await _context.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable,
                                e.Message);
        }

    }

    [HttpDelete]
    [Route("delete/{id:int}")]
    public async Task<ActionResult> Delete(int id)
    {
        try
        {
            // delete items 
            var todoListItems = await _context.ListItem.Where(item => item.AppListId == id).ExecuteDeleteAsync();

            //delete todo list
            var todoList = await _context.Lists.FindAsync(id);
            _context.Lists.Remove(todoList);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable, e.Message);
        }

    }


}
