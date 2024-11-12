using Serilog;

namespace NoteKeeper.WebApi.Config;

public static class SerilogConfigExtensions
{
    public static void ConfigureSerilog(this IServiceCollection services, ILoggingBuilder logging)
    {
        Log.Logger = new LoggerConfiguration()
            .Enrich.FromLogContext()
            .Enrich.WithClientIp()
            .Enrich.WithMachineName()
            .Enrich.WithThreadId()
            .WriteTo.Console()
            .WriteTo.NewRelicLogs(
                endpointUrl: "https://log-api.newrelic.com/log/v1",
                applicationName: "note-keeper-api",
                licenseKey: "73d84182f852556b8b41940d7529f7ffFFFFNRAL"
            )
            .CreateLogger();

        logging.ClearProviders();

        services.AddLogging(builder => builder.AddSerilog(dispose: true));
    }
}
