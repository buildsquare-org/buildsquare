# contributing

## idea

### ui style

The UI style must be kind of Mac style

### theme

the default and only theme is going to be dark since it's an app for developers.
later on, after finishing the MVP, we can consider adding a light mode

## database design (still fresh)
![buildsquare (5)](https://github.com/buildsquare-org/buildsquare/assets/113150193/1280a8b2-585e-426f-84e0-a6bc99e9f5d6)


## picking a task

you can open a PR on an issue or create a new issue and then a pr
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
