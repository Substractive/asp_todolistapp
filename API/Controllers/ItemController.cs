using API.Data;
using API.DTOs;
using API.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{

    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public ItemController(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ListItemDto>>> GetList()
    {
        var items = await _context.ListItem.ToListAsync();

        var itemsToReturn = _mapper.Map<IEnumerable<ListItemDto>>(items);

        return Ok(itemsToReturn);
    }

    [HttpPost("insert")]
    public async Task<ActionResult<ListItem>> Insert(InsertListItemDto listItemDto)
    {
        try
        {
            var newListItem = new ListItem
            {
                Opis = listItemDto.Opis,
                InProgress = listItemDto.InProgress,
                AppListId = listItemDto.AppListId,
            };

            _context.ListItem.Add(newListItem);
            await _context.SaveChangesAsync();

            return newListItem;
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable,
                               ex.Message);
        }
      
    }

    [HttpPut]
    [Route("update/{id:int}")]
    public async Task<ActionResult> Update(int id, ListItemUpdateDto listItemUpdateDto)
    {
        try
        {
            if (id == 0 || listItemUpdateDto == null)
            {
                return BadRequest(ModelState);
            }

            var list = await _context.ListItem.FindAsync(id);

            if (list == null) return NotFound();

            _mapper.Map(listItemUpdateDto, list);

            _context.ListItem.Update(list);
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
            var item = await _context.ListItem.FindAsync(id);
            _context.ListItem.Remove(item);
            _context.SaveChanges();
            return Ok();
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status503ServiceUnavailable, e.Message);
        }
    }

}
