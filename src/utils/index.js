
export const readPropertyValue = (property) => {
  if (property['title'] && property['title'].length > 0) {
    return property['title'][0]['text']['content']
  }
  if (property['rich_text'] && property['rich_text'].length > 0) {
    return property['rich_text'][0]['text']['content']
  }
  return undefined;
};
