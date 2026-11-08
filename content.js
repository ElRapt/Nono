const m = (key, text) => `<button class="memory-word" data-memory="${key}" aria-expanded="false" aria-controls="memory-preview">${text}</button>`;

export const copy = {
  fr: {
    salutation: "À toi,", openLetter: "Ouvrir la lettre à Noémie", closeLetter: "Replier la lettre",
    youtubeLink: "Écouter sur YouTube", musicLabel: "En musique",
    musicPlaying: "La musique joue.", musicLoading: "La musique se prépare…", musicPaused: "Appuie sur lecture pour écouter.",
    musicError: "La lecture n’est pas disponible ici. Le lien YouTube reste accessible.",
    turnLabel: "Noémie. Retourner la lettre et la lire en anglais",
    announcement: "La lettre est maintenant en français.",
    closeMemory: "Fermer le souvenir", closeMusic: "Fermer et arrêter la musique", skip: "Aller à la lettre",
    paragraphs: [
      `De Terres Latines en Puys, je vole parmi mes songes sans que tu ne les quitte. Qu’ils soient accompagnés de ${m("crepes", "CRÊPES")}, de curry, de ${m("chocogrenouilles", "CHOCOGRENOUILLES")}, de ${m("madeleines", "MADELEINES")} ou de skyr volé à tes lèvres ; j’inspire.`,
      `${m("ruelle", "DANS UNE RUELLE SOMBRE")} ou ${m("sommet", "AU SOMMET DU MONDE")}, je vogue dans les souvenirs qui m’évoquent tes yeux. Pour prendre le ${m("matcha", "MATCHA")} ou une ${m("despe", "DESPE")} ; j’expire.`,
      `Au frais dans la ${m("mousse", "MOUSSE")}, au chaud ${m("tables", "PARMI LES TABLES")}, je m’imprègne de ces moments qui ne me quittent pas. Si ${m("mucha", "MUCHA")} mettait la femme au centre de son monde, je le comprends car je te mets au cœur du mien ; je t’aime.`,
      `Loin de moi, j’attends que tu sois de retour, ${m("mauvais_tour", "POUR ME JOUER UN MAUVAIS TOUR")}. Je ne suis jamais le seul, que je sois ${m("poils", "DE POILS")} ou de ${m("plumes", "PLUMES")}.`,
      `On dit que les sables du Temps sont plus épais ou plus diffus selon le sablier. Ce que l’adage ne mentionne pas, c’est que sa granularité est multiple lorsqu’on est animé de la plus grande des félicités. 6 mois avec toi sont trop longs lorsque tu es loin, trop rapides lorsque tu es dans mes bras. Mais le passage du Temps ne peut éroder l’amour que je te porte.`
    ]
  },
  en: {
    salutation: "To you,", openLetter: "Open the letter to Noémie", closeLetter: "Fold the letter away",
    youtubeLink: "Listen on YouTube", musicLabel: "With music",
    musicPlaying: "The music is playing.", musicLoading: "The music is getting ready…", musicPaused: "Press play to listen.",
    musicError: "Playback is unavailable here. You can still listen on YouTube.",
    turnLabel: "Noémie. Turn the letter over and read it in French",
    announcement: "The letter is now in English.",
    closeMemory: "Close the memory", closeMusic: "Close and stop the music", skip: "Skip to the letter",
    paragraphs: [
      `From Terres Latines to the Puys, I drift through my dreams, and you never leave them. Whether they come with ${m("crepes", "CRÊPES")}, curry, ${m("chocogrenouilles", "CHOCOLATE FROGS")}, ${m("madeleines", "MADELEINES")}, or skyr stolen from your lips, I breathe in.`,
      `${m("ruelle", "IN A DARK LITTLE STREET")} or ${m("sommet", "ON TOP OF THE WORLD")}, I sail through memories that bring your eyes to mind. Over ${m("matcha", "MATCHA")} or a ${m("despe", "DESPE")}, I breathe out.`,
      `In the cool of the ${m("mousse", "MOSS")}, in the warmth ${m("tables", "AMONG THE TABLES")}, I soak up those moments that never leave me. If ${m("mucha", "MUCHA")} placed woman at the centre of his world, I understand, because I place you at the heart of mine. I love you.`,
      `When you are far from me, I wait for you to return, ${m("mauvais_tour", "TO PREPARE FOR TROUBLE")}. I am not the only one waiting: those with ${m("poils", "FUR")} and those with ${m("plumes", "FEATHERS")} wait with me.`,
      `They say the sands of Time are coarser or finer from one hourglass to the next. What the saying leaves untold is how many textures those grains can take when we are filled with the greatest happiness. These 6 months with you feel too long when you are far away, too fleeting when you are in my arms. Yet the passage of Time can never wear away the love I hold for you.`
    ]
  }
};
