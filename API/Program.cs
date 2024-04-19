using API.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddDbContext<DataContext>(opt =>
{
    // SQLITE
   // opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    // MSSQL
    opt.UseSqlServer(builder.Configuration.GetConnectionString("SqlServerConnection"));
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

var app = builder.Build();
/*
 * Auto migrate
using var scope = app.Services.CreateScope();
await using var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
await dbContext.Database.MigrateAsync();*/


if (builder.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseSwagger();

//app.UseHttpsRedirection();


app.UseCors(builder => builder
       .AllowAnyHeader()
       .AllowAnyMethod()
       .AllowAnyOrigin()
    );

// app.UseCors("CorsPolicy");

//  app.UseCors(builder => builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost").AllowAnyHeader().AllowAnyMethod());
//      .WithOrigins("https://localhost:4200"));

/*app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://dinobudic-001-site1.itempurl.com"));*/
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod()
    .AllowAnyOrigin());


// serve angular files
app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");
app.UseSwaggerUI();
app.Run();
