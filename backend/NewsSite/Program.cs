using Microsoft.EntityFrameworkCore;
using NewsSite.Application.Services;
using NewsSite.DataAccess;
using NewsSite.DataAccess.Repository;



var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddDbContext<NewsSiteDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString(nameof(NewsSiteDbContext)))
);
builder.Services.AddScoped<INewsService, NewsService>();
builder.Services.AddScoped<INewsRepository, NewsRepository>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();



app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();



app.Run();
