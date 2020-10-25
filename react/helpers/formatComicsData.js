export default function formatComicsData(comicsData) {
  const formattedComicsData = []

  for (let i = 0; i < comicsData.results.length; i++) {
    const thisResult = comicsData.results[i]

    formattedComicsData.push({
      id: thisResult.id,
      title: thisResult.title,
      description: thisResult.description,
    })
  }

  return formattedComicsData
}
