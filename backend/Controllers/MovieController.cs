using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Threading.Tasks;

namespace TMDBProxy.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly HttpClient httpClient;
        private readonly string tmdbApiKey;
        private readonly string tmdbBaseUrl;

        public MovieController(IConfiguration configuration)
        {
            httpClient = new HttpClient();
            tmdbApiKey = configuration["TMDB:ApiKey"];
            tmdbBaseUrl = configuration["TMDB:BaseUrl"];
        }

        [HttpGet("popular")]
        public async Task<IActionResult> GetPopularMovies()
        {
            var url = $"{tmdbBaseUrl}/movie/popular?api_key={tmdbApiKey}";
            var response = await httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string query)
        {
            var url = $"{tmdbBaseUrl}/search/movie?api_key={tmdbApiKey}&query={query}";
            var response = await httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }

        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetMovieDetails(int id)
        {
            var url = $"{tmdbBaseUrl}/movie/{id}?api_key={tmdbApiKey}";
            var response = await httpClient.GetAsync(url);
            var content = await response.Content.ReadAsStringAsync();
            return Content(content, "application/json");
        }
    }
}
