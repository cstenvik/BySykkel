# BySykkel

Liten webapplikasjon som viser Oslo Bysykkel sine stasjoner med tilgjengelige sykler og låser

# Om prosjektet

Applikasjonen er skrevet i JavaScript/Vue3.   
Den benytter BySykkel sitt åpne API som kalles ved lasting av siden vha axios.  
Om noe går galt med kall mot API`et vil det vises en standard feilmelding.  

Applikasjonene krever Node/npm.  
Google Maps API nøkkel må også angis i en env.local fil 


## Innstaller prosjektet

```sh
npm install
```

### Kjør lokalt

```sh
npm run dev
```

### Klargjør for produksjon

```sh
npm run build
```

### Unit testing med [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint med [ESLint](https://eslint.org/)

```sh
npm run lint
```
