const REPO_URL = "https://api.github.com/users/yelp/repos";
const MEMBER_URL = "https://api.github.com/orgs/yelp/members";

class GithubApi {

    static async getMembers(): Promise<any> {
        return await getAllPages(MEMBER_URL)
    }

    static async getRepos(): Promise<any> {
        return await getAllPages(REPO_URL)
    }

}

async function getAllPages(urlPrefix:string, page?:number, results?:any) {
    page = page || 1;
    results = results || [];

    var url = urlPrefix + "?per_page=100&page=" + page;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
        data.forEach(function (item:any) {
            results.push(item);
        });

        const linkHeader = response.headers.get('link');
 
        if (linkHeader && linkHeader.includes(`rel=\"next\"`))
            await getAllPages(urlPrefix, page + 1, results);
    }
    return results; 
}

export default GithubApi;