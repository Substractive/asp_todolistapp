using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

 

    public DbSet<AppList> Lists { get; set; }
    public DbSet<ListItem> ListItem { get; set; }
}


