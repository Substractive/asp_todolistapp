using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppList, TodoListDto>();
        CreateMap<ListItem, ListItemDto>();
        CreateMap<ListUpdateDto, AppList>();
        CreateMap<ListItemUpdateDto, ListItem>();
    }
}
