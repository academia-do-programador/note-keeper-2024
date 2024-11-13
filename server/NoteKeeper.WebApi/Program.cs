using NoteKeeper.WebApi.Config;
using NoteKeeper.WebApi.Identity;
using Serilog;

namespace NoteKeeper.WebApi;

public class Program
{
    public static void Main(string[] args)
    {
        const string politicaCors = "_minhaPoliticaCors";

        var builder = WebApplication.CreateBuilder(args);

        builder.Services.ConfigureDbContext(builder.Configuration);

        builder.Services.ConfigureCoreServices();

        builder.Services.ConfigureAutoMapper();

        builder.Services.ConfigureSerilog(builder.Logging, builder.Configuration);

        builder.Services.ConfigureIdentity();

        builder.Services.ConfigureJwt(builder.Configuration);

        builder.Services.ConfigureControllersWithFilters();

        builder.Services.ConfigureCors(politicaCors);

        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerGen();

        var app = builder.Build();

        app.UseGlobalExceptionHandler();

        app.UseSwagger();
        app.UseSwaggerUI();

        var migracaoConcluida = app.AutoMigrateDatabase();

        if (migracaoConcluida) Log.Information("Migração de banco de dados concluída");

        else Log.Information("Nenhuma migração de banco de dados pendente");

        app.UseHttpsRedirection();

        app.UseCors(politicaCors);

        app.UseAuthorization();

        app.MapControllers();

        try
        {
            app.Run();
        }
        catch (Exception ex)
        {
            Log.Fatal("Ocorreu um erro que ocasionou no fechamento da aplicação.", ex);

            return;
        }
    }
}
