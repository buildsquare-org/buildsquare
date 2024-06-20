# contributing

## idea

### ui style

the ui style must be kind of mac style

### theme

the default and only theme is going to be dark, since its an app for developers.
later on, after finishing the mvp, we can consider adding light mode

## picking a task

you can open a pr on an issue or create a new issue and then a pr
the kanban board of the task is public [here](https://github.com/orgs/buildsquare-org/projects/1/views/1)

## set up locally

### clone repository

```bash
git clone https://github.com/buidlsquareorg/buildsquare
cd buidlsquare
```

### install dependencies

```bash
pnpm i
```

### set up env variables

```bash
cp env.example .env.local # copy env.example file to a new file named .env.local
```

(fill the variables)

### set up api and databse

follow supabse [docs](https://supabase.com/docs/guides/cli/local-development)
