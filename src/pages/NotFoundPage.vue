<template>
<main class="content container">
    <div class="content__top">
        <h1 class="content__title">404! Страница не существует</h1>
        <router-link class="return__link" v-bind:to="{name:'main'}">
            Вернуться на главную
        </router-link>
    </div>
</main>
</template>

<style>
.return__link {
    font-family: "PressStart";
    font-size: 16px;
    line-height: 24px;
    color: #9eff00;
    border-bottom: 2px dashed transparent;
    -webkit-transition: all .2s ease;
    transition: all .2s ease;
}

.return__link:hover {
    color: #000;
}
</style>
