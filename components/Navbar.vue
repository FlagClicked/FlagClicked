<template>
  <div class="navbar">
    <NuxtLink class="item" to="/">
      when
      <img src="/greenflag.svg" class="logo" />
      clicked
      <span class="version">ALPHA</span>
    </NuxtLink>

    <div class="item">
      <NuxtLink class="button" to="/explore">Explore</NuxtLink>
    </div>

    <template v-if="$auth.user">
      <div class="item" data-small1>
        <NuxtLink class="button" to="/tutorials">My Tutorials</NuxtLink>
      </div>
      <div class="item" data-small2>
        <NuxtLink class="button" to="/tutorials/new">New Tutorial</NuxtLink>
      </div>

      <NuxtLink to="/settings" class="item">
        <span class="username">{{ $auth.user.username }}</span>
        <img
          :src="`https://cdn2.scratch.mit.edu/get_image/user/${$auth.user.id}_500x500.png`"
        />
      </NuxtLink>
    </template>

    <template v-else>
      <div class="item">
        <NuxtLink class="button" to="/about">About</NuxtLink>
      </div>
      <NuxtLink to="/login" class="item right">
        <span>Login</span>
      </NuxtLink>
    </template>
  </div>
</template>

<style scoped>
.navbar {
  background: #ffbf00;
  display: flex;
  padding: 0px 10px;
}

.item {
  display: flex;
  font-size: 24px;
  align-items: center;
  user-select: none;
  height: 65px;
  justify-content: center;
  flex: 1;
  text-decoration: none;
}
.button {
  display: flex;
  justify-content: center;
  color: #5d657c;
  background: white;
  border-radius: 20pc;
  border: #00000045 solid 2px;
  padding: 4px 10px;
  text-decoration: none;
}

.button:hover {
  border-width: 0px;
  box-shadow: 0px 0px 8px #888888;
}

.item img {
  width: 40px;
  height: 40px;
}

.right {
  margin-left: auto;
}

.version {
  font-size: 10px;
  background-color: #21bcff;
  padding: 2px;
  border-radius: 10px;
  border: 10px;
  margin-left: 10px;
}

.username {
  padding: 0px 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 160px;
}

.logo {
  padding: 0px 4px;
}

@media (max-width: 955px) {
  [data-small1] {
    display: none;
  }
}
@media (max-width: 800px) {
  [data-small2] {
    display: none;
  }
}
</style>
