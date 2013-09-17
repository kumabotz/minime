var load_github_repo = function() {
  $.getJSON(
    "https://api.github.com/users/kumabotz/repos?callback=?&per_page=100",
    function(response) {
      var reposList = document.getElementById('repos-list');
      var projectsCount = document.getElementById('projects-count');
      var projectsInfo = document.getElementById('projects-info');

      if (!response || !response.data || !response.data.length) return;

      var repos = response.data;
      var html = '';
      repos.sort(function(a, b) {
        var aFork = a.fork, bFork = b.fork;
        // sort by source repo, then by fork repo
        if (aFork && !bFork) return 1;
        if (!aFork && bFork) return -1;
        // sort by lastest pushed date
        return new Date(b.pushed_at) - new Date(a.pushed_at);
      });
      var total_repos = repos.length;
      var total_public_repos = 0;
      var total_fork_repos = 0;
      var total_watchers = 0;
      var total_forks = 0;
      for (var i = 0; i < total_repos; i++) {
        var repo = repos[i];
        var fork = repo.fork? ' class="octicon-repo-forked"' : '';
        var watchers = repo.watchers;
        var forks = repo.forks;
        total_watchers += watchers;
        total_forks += forks;
        fork ? total_fork_repos++ : total_public_repos++;
        html += '<li>' +
                '<a ' + fork + 'href="' + repo.html_url + '">' +
                '<span class="info">' +
                '<b class="language">' + (repo.language || '') +'</b>' +
                '<b class="octicon-star">' + watchers + '</b>' +
                '<b class="octicon-git-branch">' + forks + '</b>' +
                '</span>' +
                '<b>' + repo.name + '</b>' +
                '<span class="desc">' + repo.description +'</span>' +
                '</a></li>';
      }
      reposList.innerHTML = html;
      projectsCount.innerHTML = total_repos + ' repos (' +
                                total_public_repos + ' public, ' +
                                total_fork_repos + ' forks)';
      projectsInfo.innerHTML = '<b class="octicon-star">' + total_watchers + '</b>' +
                               '<b class="octicon-git-branch">' + total_forks + '</b>';
    }
  );
}
