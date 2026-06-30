const MinistryQuestions = [
  {
    id: "Q001",
    stage: "Ethical Judgment",
    interviewer: "Chief Recruitment Officer Eleanor Ashcroft",
    title: "The Burning Archive",
    scenario: `
A classified magical archive has caught fire.

Inside remain:

• one confidential Ministry document
• one unconscious colleague
• one cursed magical artifact

You have time to save only ONE.

What do you choose?
    `,
    choices: [
      {
        text: "Save the document.",
        response: "Interesting. You place the institution before the individual. That is uncommon.",
        scores: { duty: 8, discretion: 4, loyalty: 2 }
      },
      {
        text: "Save the colleague.",
        response: "Compassion can save lives. It can also compromise missions.",
        scores: { empathy: 8, loyalty: 5, courage: 2 }
      },
      {
        text: "Secure the artifact.",
        response: "Practical. Many senior investigators answered similarly.",
        scores: { logic: 7, duty: 3, discretion: 4 }
      },
            {
        text: "Search for another solution despite the risk.",
        response: "Rules are useful. Until they stop being useful.",
        scores: { courage: 5, curiosity: 5, independence: 6 }
      }
    ]
  },

  {
    id: "Q002",
    stage: "Pressure Response",
    interviewer: "Auror Commander Elias Graves",
    title: "The Collapsing Corridor",
    scenario: `
During an emergency response, a Ministry corridor begins collapsing.

Ahead of you are:

• a trapped civilian
• a sealed evidence box
• a wounded suspect who may know the truth

You cannot save all three.

What is your priority?
    `,
    choices: [
      {
        text: "Save the civilian first.",
        response: "A humane answer. The Ministry needs people who remember why it exists.",
        scores: { empathy: 7, courage: 4, duty: 2 }
      },
      {
        text: "Secure the evidence box.",
        response: "You understand that truth can outlive panic. Useful, if controlled.",
        scores: { duty: 6, discretion: 5, logic: 4 }
      },
      {
        text: "Save the suspect for interrogation.",
        response: "Practical. Perhaps cold. But not without reason.",
        scores: { logic: 6, ambition: 3, discretion: 4 }
      },
      {
        text: "Attempt to stabilize the corridor and save everyone.",
        response: "Dangerous optimism. Sometimes that is courage. Sometimes it is arrogance.",
        scores: { courage: 6, independence: 5, resilience: 4 }
      }
    ]
  }

];