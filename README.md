# NeoHack project

## Работа с git

Для работы над проектом, вам понадобится установить систему контроля версий git.

1. Установите git согласно
   инструкции. [Ссылка на инструкцию.](https://git-scm.com/book/ru/v2/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git)

2. Скопируйте (склонируйте) проект в рабочую папку на компьютере. Есть 2 возможных способа копирования: с помощью HTTPS
   и SSH. Для клонирования с использованием протокола HTTPS используйте логин и пароль от выданного репозитория. Для
   клонирования с помощью SSH, установите SSH ключи.
   Пример клонирования с помощью SSH
   можно [найти по ссылке](https://itisgood.ru/2021/10/14/kak-klonirovat-git-repozitorij-v-opredelennuju-papku/)
   Инструкцию по работе с SSH ключами можно
   найти [тут](https://docs.gitlab.com/ee/user/ssh.html#generate-an-ssh-key-pair)

3. Добавьте необходимые файлы в папку с проектом.

4. Сохраните изменения в папке командой `git commit -a -m"My first commit"`

5. Отправьте сохраненные изменения в репозиторий gitlab с помощью команды `git push`

Больше команд по работе с git вы можете узнать
из [шпаргалки](https://training.github.com/downloads/ru/github-git-cheat-sheet/)

## Шаблон проекта

В репозитории вы найдете 3 папки: backend, backend_node и frontend. В каждом из них развернут пустой проект (java, node
js и react соответсвенно). В каждой папке есть Dockerfile для сборки приложения.
Для успешного запуска приложения, мы рекомендуем следовать предложенному шаблону и работать в нём.
Допускается создание под-папок и любой удобной структуры в рамках своей работы, но для корректной работы CI/CD
необходимо, чтобы приложения всегда были в исходных папках backend и frontend, а соответствующие Dockerfile лежали в
корне этих директорий.

Так как в рамках мероприятия возможна разработка backend как на node js, так и на java, мы подготовили 2 шаблона.

Если вы приняли решение писать backend на Java, используйте проект в папке backend, а папку backend_node можете удалить.

Если вы решили писать backend на Node js, то первым шагом удалите папку backend с java-проектом, а папку backend_node переименуйте в backend.

#### Внимание! Backend приложение всегда должно располагаться в папке с названием backend и открываться (работать) на 8080 порту и принимать запросы по пути /api.

#### Frontend часть решения должна всегда храниться в папке frontend и собираться на порту 3000.



## CI/CD (сборка и деплой) приложения

Мы подготовили пайплайны сборки и деплоя приложений из папок. Для того, чтобы запустить CI/CD пайплайн, вам необходимо
запушить (git push) изменения в main ветку репозитория. Всё остальное запустится автоматически.

Отслеживать работу сборок можно в разделе CI/CD -> Jobs в левом меню Gitlab.

Ссылки на развернутые приложения вы сможете найти в разделе Deployments -> Environments в левом меню Gitlab.

#### Обратите внимание, ваше frontend приложение будет доступно по адресу https://{PROJECT_NAME}-{GROUP_ID}.nh2023.codenrock.com, а backend приложение - по https://{PROJECT_NAME}-{GROUP_ID}.nh2023.codenrock.com/api

Не забудьте учесть это при разработке платформы.

Для удобства URL приложения выводится в логе сборочного пайплайна. Также в приложение можно перейти сразу из Gitlab из меню Deployments/Environments в проекте. Пример URL приложения - https://ed-platform-6076.nh2023.codenrock.com/


## Рекомендации

В ходе работы вы можете создавать, комитить и мёржить любое количество веток. Как только приложение готово к пробному
запуску, мы рекомендуем собрать все изменения и запушить в main ветку.

### Мы не рекомендуем использовать main ветку, как место постоянной разработки. Каждый git push в main ветку будет провоцировать запуск CI/CD пайплайна, а значит множить очередь на сборку проектов всех команд.

## Подключение к kubernetes cluster

В качестве облачной инфраструктуры, вам выделен namespace в kubernetes cluster. При необходимости подключения,
воспользуйтесь клиентом kubectl и выданными доступами. Доступы даются на команду. Если у вас нет доступов, свяжитесь с
организатором.

Конфиг подключения будет выдан в виде файла `*.kube.config`. 

Состояние namespace, работающие pods и логи приложений можно посмотреть по адресу [https://dashboard.nh2023.codenrock.com/](https://dashboard.nh2023.codenrock.com/). Для открытия дашборда необходимо выбрать авторизацию через Kubeconfig и указать путь до выданного вам `*.kube.config` файла

### База данных
На каждую команду созданы базы данных Postgres. Доступы (login и password) выдаются на каждую команду организатором.

Для подключения к Postgres используйте следующую команду (для удобства имя базы данных совпадает с логином и именем группы в Gitlab):
```
psql "host=rc1b-n21jq8ye0vwxdfsg.mdb.yandexcloud.net \
      port=6432 \
      sslmode=verify-full \
      dbname=cnrprod-team-xxxxx \
      user=cnrprod-team-xxxxx \
      target_session_attrs=read-write"
```
`rc1b-n21jq8ye0vwxdfsg.mdb.yandexcloud.net` - адрес хоста в кластере Yandex.Cloud. Подробнее в [документации](https://cloud.yandex.ru/docs/managed-postgresql/). Не забудьте скачать и установить [SSL сертификат](https://cloud.yandex.ru/docs/managed-postgresql/operations/connect#get-ssl-cert).

## Jupiter для Data-инженеров

Для работы Data-инженеров мы подготовили Jupiter.

Вход в Jupiter находится по ссылке [http://jupiter.nh2023.codenrock.com](http://jupiter.nh2023.codenrock.com)

Для авторизации используйте логин и пароль от выданного репозитория Gitlab.

## Данные для Data-инженеров

В рамках задачи, вам предлагается проанализировать определённый набор данных. Часть из них вы можете найти в описании
задачи (ссылки на .csv и .json файлы), а часть расположена в отдельной базе данных Postgres. Доступ к базе вы можете
получить у организаторов. Так же, эту базу данных можно использовать для логирования и других нужд.
