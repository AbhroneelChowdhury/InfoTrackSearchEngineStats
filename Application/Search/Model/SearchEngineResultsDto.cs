using System.Collections.Generic;

namespace Application.Search.Model
{
    public record SearchEngineResultsDto(List<int> SearchPosition, int OccurrenceCount);
}