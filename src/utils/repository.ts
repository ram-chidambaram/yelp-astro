import oss_projects from "./projects";

class Repository {
    // attributes
    name:string;
    language:string;
    url:string;
    description:string;
    fork:boolean;
    watchers:number;
    forks:number;

    //computed values
    featured: boolean = false;
    deprecated: boolean = false;
    position: number = 0;
    blogPost?: string;
    logo?:string;
    background?: string;
    classes?: string;


    constructor(repo:any) {
        this.name        = repo.name;
        this.language    = repo.language;
        this.url         = repo.html_url;
        this.description = repo.description;
        this.fork        = repo.fork;
        this.watchers    = repo.watchers;
        this.forks       = repo.forks;
        
        let proj = oss_projects[this.name];

        if (proj) {
            this.blogPost = proj.blog_post;
            this.featured = proj.featured;
            this.deprecated = proj.deprecated;
            this.position = proj.position ? proj.position : 0;
            this.logo = proj.logo;
            this.background = proj.background;
            this.classes = this.featured ? 'featured-project' 
                : this.deprecated ? 'deprecated-project': undefined;
        }
    }

}

export default Repository;
  
  