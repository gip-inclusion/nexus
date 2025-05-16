<!-- src/routes/login/+page.svelte -->
<form method="POST" action="/auth/request-magic-link">
  <input type="email" name="email" required />
  <button type="submit">Recevoir un lien magique</button>
</form>