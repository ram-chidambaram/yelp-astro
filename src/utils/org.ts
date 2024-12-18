import Repository from './repository'

class Organization {
    name: string;
    totalForks: number = 0;
    watchers: number = 0;
    forkedCount: number = 0;
    featuredRepos: Repository[] = [];
    deprecatedRepos: Repository[] = [];
    forkedRepos: Repository[] = [];
    regularRepos: Repository[] = [];

    constructor(name: string, repos: Repository[]) {
        this.name = name;

        repos.forEach( (repo) => {
            this.totalForks += repo.forks;
            this.watchers += repo.watchers;
            repo.fork && (this.forkedCount += 1);

            if (repo.featured && !repo.fork) {
                repo.position > 0 ?
                    this.featuredRepos[repo.position - 1] = repo : 
                    this.featuredRepos.push(repo);
            }

            if (repo.deprecated && !repo.fork) {
                this.deprecatedRepos.push(repo);
            }

            if (repo.fork) {
                this.forkedRepos.push(repo);
            }

            if (!repo.fork && !repo.featured && !repo.deprecated) {
                this.regularRepos.push(repo);
            }            
        });        

    }

}

export default Organization;