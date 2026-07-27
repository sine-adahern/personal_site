export interface NavPanel {
  name: string;
  href: string;
  thumb: string;
  thumbLight?: string;
  /**
   * Phone-width nav thumbnails (SideNav, NavWheel/HomeMini below 768px): real
   * portrait screenshots of the page's mobile layout, shown instead of `thumb`
   * / `thumbLight`. Optional — panels without one (Home) just keep the
   * landscape thumb at every width.
   */
  thumbMobile?: string;
  thumbMobileLight?: string;
  /** Render a live miniature of the home page instead of a static thumbnail. */
  mini?: boolean;
}
