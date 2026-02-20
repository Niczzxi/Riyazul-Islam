export interface Project {
  _id: string;
  slug: string;
  title: string;
  category: string[];
  date: string;
  overview: string;
  description: string;
  features: string[];
  technologies: string[];
  images: {
    cover: string;
    gallery: string[];
  };
  links: {
    live: string;
    githubClient: string;
    githubServer: string;
  };
}
