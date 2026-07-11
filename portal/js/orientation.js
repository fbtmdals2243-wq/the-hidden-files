function showArchiveCabinet(){

  const case000Status = Player.getCaseStatus("CASE-000");

  const hasLevelII =
    Player.hasClearance("Level II");

  app.innerHTML = `
    <section class="panel">

      <div class="seal">
        BRITISH MINISTRY OF MAGIC
      </div>

      <h1>ARCHIVE CABINET</h1>

      <h2>${Player.getClearance()} ACCESS</h2>

      <div class="notice">

        <h3>PUBLIC ARCHIVE</h3>

      </div>

      <div class="case-list">

        <button class="case-entry available"
          onclick="openCase('CASE-000')">

          <b>CASE-000</b>

          <span>The Missing Owl</span>

          <small>Status: ${case000Status}</small>

        </button>

      </div>

      <div class="notice">

        <h3>RESTRICTED ARCHIVE</h3>

      </div>

      <div class="case-list">

        ${
          hasLevelII
          ?
          `
          <button class="case-entry available">

            <b>CASE-001</b>

            <span>Memory Fracture</span>

            <small>Classification: Level II</small>

          </button>
          `
          :
          `
          <button class="case-entry locked">

            <b>CASE-001</b>

            <span>Memory Fracture</span>

            <small>🔒 Clearance Level II Required</small>

          </button>
          `
        }

        <button class="case-entry locked">

          <b>CASE-ZERO</b>

          <span>Restricted Archive Origin</span>

          <small>🔒 Clearance Level V Required</small>

        </button>

      </div>

      <div class="terminal">
ARCHIVE STATUS: ACTIVE
CLEARANCE: ${Player.getClearance()}
PUBLIC FILES: AVAILABLE
RESTRICTED FILES: ${
          hasLevelII
          ? "LEVEL II ACCESS GRANTED"
          : "ACCESS DENIED"
      }
      </div>

      <div class="center">

        <button class="btn"
          onclick="showDashboard()">

          RETURN TO OFFICE

        </button>

      </div>

    </section>
  `;

}