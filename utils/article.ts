import yaml from 'js-yaml'

export function parseFrontmatter(content: string): any {
  const frontmatter = content.split('---')[1].trim()
  return yaml.load(frontmatter)
}

export function frontmatterToContnet(orgContent: string, data: any) {
  const frontmatter = yaml.dump(data).trim()
  return `---\n${frontmatter}\n---${orgContent.split('---')[2]}`
}
