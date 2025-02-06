using Microsoft.EntityFrameworkCore;
using TodoApi;
//"ConnectionStrings":{"ToDoDB": "server=localhost;user=root;password=aA1795aA;database=ToDoDB"}


var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
    builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

var conectionString = builder.Configuration.GetConnectionString("ToDoDB");
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(conectionString, ServerVersion.AutoDetect(conectionString))
);
// builder.Services.AddControllers();///
builder.Services.AddAuthorization();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1"); ;
    c.RoutePrefix = string.Empty;
});

app.UseCors("AllowAll");
// app.UseAuthorization();////
// app.MapControllers();////

app.MapGet("/items", async (ToDoDbContext db) => { return await db.Items.ToListAsync(); });
// app.MapGet("/", async (ToDoDbContext db) => { return await db.Items.ToListAsync(); });
app.MapPost("/items", async (ToDoDbContext db, Item newItem) =>
{
    db.Add(newItem);
    await db.SaveChangesAsync();
    return Results.Created($"/items/{newItem.Id}", newItem);
});
app.MapPut("/items/{id}", async (ToDoDbContext db, int id, Item updatedItem) =>
{
    var item = await db.Items.FindAsync(id);
    if (item == null) return Results.NotFound();
    item.Name = updatedItem.Name;
    item.IsComplete = updatedItem.IsComplete;
    await db.SaveChangesAsync();
    return Results.Ok();
    // return Results.NoContent();
});
app.MapDelete("items/{id}", async (ToDoDbContext db, int id) =>
{
    var item = await db.Items.FindAsync(id);
    if (item == null) return Results.NotFound();
    db.Items.Remove(item);
    await db.SaveChangesAsync();
    return Results.Ok();
});


app.Run();


