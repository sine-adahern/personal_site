export interface NavPanel {
  name: string;
  href: string;
  thumb: string;
  thumbLight?: string;
  /** Render a live miniature of the home page instead of a static thumbnail. */
  mini?: boolean;
}
