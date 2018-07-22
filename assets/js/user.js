var github = null;

if (GitHub && localStorage.getItem('github')) {
  github = new GitHub({
    token: localStorage.getItem('github')
  });
}
