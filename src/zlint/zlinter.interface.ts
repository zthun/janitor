export interface IZLinter {
  lint(src: string[], config?: string): Promise<boolean>;
}
