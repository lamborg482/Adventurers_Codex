<template>
    <div class="home-view">
        <div class="home-view__all-title">
            <h1 class="home-view__title">Управляйте приключениями<br>Следите за партией </h1>
            <p class="home-view__par">Adventurers Codex — интерактивный лист персонажа с мощными инструментами для Мастера игры.<br>Автоматические расчёты, боевой трекер, управление группой и интеграция с сюжетом.</p>
        </div>
        <div class="home-view__all-button">
            <router-link to="/list-players" class="home-view__but-all home-view___button-player">
                <span class="button-line-top"></span>
                <span class="button-line-bottom"></span>
                Создать персонажа
            </router-link>
            <router-link to="/list-master" class="home-view__but-all home-view___button-master">
                <span class="button-line-top"></span>
                <span class="button-line-bottom"></span>
                Режим мастера
            </router-link>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'HomeView'
}
</script>