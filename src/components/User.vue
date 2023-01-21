<template>
  <div>
    <h1>User Profile</h1>
    <div>GLO-3102 User Profile page</div>
  </div>
</template>

<style>
div {
  margin: 3px;
}
label{
  display: inline-block;
  width: 100px;
}
</style>
<form>
  <div>
  <label>Username: </label>
  <input type="email" autocomplete="username" id="email" />
  </div> 
  <div>
  <label>Password</label>
  <input type="password" autocomplete="newPassword" />
  </div>

  <input type="submit" value="Login" />
</form>


