function showCaseList() {
    showArchiveCabinet();
}


function openCase(caseId) {

    const caseData =
        MinistryCases[caseId];

    /*
      존재하지 않는 사건이면
      다른 데이터를 읽기 전에 중단
    */
    if (!caseData) {
        alert("Case not found.");
        return;
    }

    const currentStatus =
        localStorage.getItem(
            "caseStatus_" + caseId
        ) || caseData.status;


    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                BRITISH MINISTRY OF MAGIC
            </div>

            <h1>${caseData.id}</h1>

            <h2>${caseData.title}</h2>

            <div class="notice">

                <p>
                    <b>Classification:</b>
                    ${caseData.classification}
                </p>

                <p>
                    <b>Status:</b>
                    ${currentStatus}
                </p>

                <p>
                    <b>Department:</b>
                    ${caseData.department}
                </p>

                <hr>

                <p>${caseData.summary}</p>

            </div>

            <div class="center">

                <button
                    class="btn"
                    onclick="openEvidence('${caseData.id}')">
                    EVIDENCE
                </button>

                <button
                    class="btn"
                    onclick="openWitnesses('${caseData.id}')">
                    WITNESSES
                </button>

                <button
                    class="btn"
                    onclick="openTimeline('${caseData.id}')">
                    TIMELINE
                </button>

                <button
                    class="btn"
                    onclick="openNotes('${caseData.id}')">
                    NOTES
                </button>

                <button
                    class="btn"
                    onclick="openReport('${caseData.id}')">
                    REPORT
                </button>

                <button
                    class="btn"
                    onclick="showCaseList()">
                    BACK
                </button>

            </div>

        </section>
    `;
}


function openEvidence(caseId){

    const caseData =
        MinistryCases[caseId];

    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                EVIDENCE INDEX
            </div>

            <h1>${caseData.id}</h1>

            <h2>${caseData.title}</h2>

            <div class="case-list">

                ${
                    caseData.evidence.map(
                        item => `
                            <button
                                class="case-entry available"
                                onclick="openEvidenceItem('${caseId}','${item.id}')">

                                <b>${item.id}</b>

                                <span>${item.title}</span>

                                <small>${item.type}</small>

                            </button>
                        `
                    ).join("")
                }

            </div>

            <div class="center">

                <button
                    class="btn"
                    onclick="openCase('${caseId}')">

                    BACK TO CASE

                </button>

            </div>

        </section>
    `;
}


function openTimeline(caseId){

    const caseData =
        MinistryCases[caseId];

    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                CASE TIMELINE
            </div>

            <h1>${caseData.id}</h1>

            <h2>${caseData.title}</h2>

            ${renderMinistryDocument({

                seal:
                    "MINISTRY CASE TIMELINE",

                title:
                    caseData.title,

                subtitle:
                    "Timeline · " + caseData.id,

                classification:
                    caseData.classification,

                department:
                    caseData.department,

                status:
                    "Reviewed",

                body:
                    caseData.timeline
                        .map(item => "• " + item)
                        .join("\n"),

                footer:
                    "CASE TIMELINE · ARCHIVE COPY"

            })}

            <div class="center">

                <button
                    class="btn"
                    onclick="openCase('${caseId}')">

                    BACK TO CASE

                </button>

            </div>

        </section>
    `;
}


function openNotes(caseId){

    const caseData =
        MinistryCases[caseId];

    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                INTERNAL NOTES
            </div>

            <h1>${caseData.id}</h1>

            <h2>${caseData.title}</h2>

            <div class="notice">

                ${
                    caseData.notes.map(
                        item => `
                            <p>• ${item}</p>
                        `
                    ).join("")
                }

            </div>

            <div class="center">

                <button
                    class="btn"
                    onclick="openCase('${caseId}')">

                    BACK TO CASE

                </button>

            </div>

        </section>
    `;
}


function openEvidenceItem(
    caseId,
    evidenceId
){

    const caseData =
        MinistryCases[caseId];

    const evidence =
        caseData.evidence.find(
            item => item.id === evidenceId
        );


    if(!evidence){

        alert(
            "Evidence not found."
        );

        return;
    }


    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                MINISTRY EVIDENCE RECORD
            </div>

            <h1>${evidence.id}</h1>

            <h2>${evidence.title}</h2>

            ${renderMinistryDocument({

                seal:
                    "MINISTRY EVIDENCE RECORD",

                title:
                    evidence.title,

                subtitle:
                    evidence.id +
                    " · " +
                    caseData.id,

                classification:
                    caseData.classification,

                department:
                    caseData.department,

                status:
                    "Reviewed",

                body:
                    evidence.body,

                footer:
                    "EVIDENCE RECORD · ARCHIVE COPY"

            })}

            <div class="terminal">EVIDENCE RECORD OPENED
CASE: ${caseData.id}
EVIDENCE ID: ${evidence.id}
STATUS: REVIEWED</div>

            <div class="center">

                <button
                    class="btn"
                    onclick="openEvidence('${caseId}')">

                    BACK TO EVIDENCE

                </button>

            </div>

        </section>
    `;
}


function openWitnesses(caseId){

    const caseData =
        MinistryCases[caseId];

    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                WITNESS INDEX
            </div>

            <h1>${caseData.id}</h1>

            <h2>${caseData.title}</h2>

            <div class="case-list">

                ${
                    caseData.witnesses.map(
                        item => `
                            <button
                                class="case-entry available"
                                onclick="openWitnessStatement('${caseId}', '${item.id}')">

                                <b>${item.id}</b>

                                <span>${item.name}</span>

                                <small>${item.role}</small>

                            </button>
                        `
                    ).join("")
                }

            </div>

            <div class="center">

                <button
                    class="btn"
                    onclick="openCase('${caseId}')">

                    BACK TO CASE

                </button>

            </div>

        </section>
    `;
}


function openWitnessStatement(
    caseId,
    witnessId
){

    const caseData =
        MinistryCases[caseId];

    const witness =
        caseData.witnesses.find(
            item => item.id === witnessId
        );


    if(!witness){

        alert(
            "Witness statement not found."
        );

        return;
    }


    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                WITNESS STATEMENT
            </div>

            <h1>${witness.id}</h1>

            <h2>${witness.name}</h2>

            ${renderMinistryDocument({

                seal:
                    "MINISTRY WITNESS STATEMENT",

                title:
                    witness.name,

                subtitle:
                    witness.id +
                    " · " +
                    caseData.id,

                classification:
                    caseData.classification,

                department:
                    caseData.department,

                status:
                    "Statement Recorded",

                body:
                    witness.statement,

                footer:
                    "WITNESS TESTIMONY · ARCHIVE COPY"

            })}

            <div class="terminal">WITNESS RECORD OPENED
CASE: ${caseData.id}
WITNESS ID: ${witness.id}
STATUS: REVIEWED</div>

            <div class="center">

                <button
                    class="btn"
                    onclick="openWitnesses('${caseId}')">

                    BACK TO WITNESSES

                </button>

            </div>

        </section>
    `;
}


function openReport(caseId){

    const caseData =
        MinistryCases[caseId];

    const officerName =
        localStorage.getItem(
            "ministryApplicantName"
        ) || "Officer";


    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                MINISTRY INVESTIGATION REPORT
            </div>

            <h1>${caseData.id}</h1>

            <h2>${caseData.title}</h2>

            ${renderMinistryDocument({

                seal:
                    "MINISTRY INVESTIGATION REPORT",

                title:
                    "Internal Case Report",

                subtitle:
                    caseData.id +
                    " · Filed by Officer " +
                    officerName,

                classification:
                    caseData.classification,

                department:
                    caseData.department,

                status:
                    "Draft",

                body:`Officer: ${officerName}

Case: ${caseData.id}
Title: ${caseData.title}

Findings:
[Write your findings here.]

Recommendation:
[Write your recommendation here.]`,

                footer:
                    "INVESTIGATION REPORT · DRAFT COPY"

            })}


            <div class="notice">

                <label>
                    Findings
                </label>

                <textarea
                    id="reportFindings"
                    class="field area"
                    placeholder="Summarize what you found...">
                </textarea>


                <label>
                    Recommendation
                </label>

                <textarea
                    id="reportRecommendation"
                    class="field area"
                    placeholder="What should the Ministry do next?">
                </textarea>

            </div>


            <div class="center">

                <button
                    class="btn"
                    onclick="submitReport('${caseId}')">

                    SUBMIT REPORT

                </button>

                <button
                    class="btn"
                    onclick="openCase('${caseId}')">

                    BACK TO CASE

                </button>

            </div>

        </section>
    `;
}


function submitReport(caseId){

    const findings =
        document
            .getElementById(
                "reportFindings"
            )
            .value
            .trim();


    const recommendation =
        document
            .getElementById(
                "reportRecommendation"
            )
            .value
            .trim();


    if(
        !findings ||
        !recommendation
    ){

        alert(
            "Both findings and recommendation are required."
        );

        return;
    }


    /* =====================================================
       SAVE REPORT
    ===================================================== */

    localStorage.setItem(

        "report_" + caseId,

        JSON.stringify({

            findings,

            recommendation,

            submittedAt:
                new Date().toISOString()

        })

    );


    /* =====================================================
       CASE-001
    ===================================================== */

    if(
        caseId ===
        "CASE-001"
    ){

        Player.setCaseStatus(
            "CASE-001",
            "Solved"
        );


        localStorage.setItem(
            "caseCompleted_CASE-001",
            new Date().toISOString()
        );


        app.innerHTML = `
            <section class="panel">

                <div class="seal">
                    RESTRICTED CASE REVIEW
                </div>

                <h1>
                    Investigation Complete
                </h1>

                <h2>
                    CASE-001 · Memory Fracture
                </h2>


                <div class="notice">

                    <p>
                        Your investigation report has been
                        accepted into the restricted archive.
                    </p>

                    <p>
                        CASE-001 has been transferred
                        to senior Ministry personnel
                        for further classified examination.
                    </p>

                </div>


                <div class="terminal">CASE: CASE-001
TITLE: MEMORY FRACTURE
REPORT: ACCEPTED
CASE STATUS: SOLVED
DAY 2 ASSIGNMENT: COMPLETE</div>


                <div class="center">

                    <button
                        class="btn"
                        onclick="showDashboard()">

                        RETURN TO OFFICE

                    </button>

                </div>

            </section>
        `;


        return;
    }


    /* =====================================================
       CASE-002
    ===================================================== */

    if(
        caseId ===
        "CASE-002"
    ){

        Player.setCaseStatus(
            "CASE-002",
            "Solved"
        );


        localStorage.setItem(
            "caseCompleted_CASE-002",
            new Date().toISOString()
        );


        app.innerHTML = `
            <section class="panel">

                <div class="seal">
                    OFFICE OF THE UNDERSECRETARY
                </div>

                <h1>
                    Investigation Complete
                </h1>

                <h2>
                    CASE-002 · The Officer Who Never Existed
                </h2>


                <div class="notice">

                    <p>
                        Your investigation report has been
                        received by the Office of the Undersecretary.
                    </p>

                    <p>
                        The Ministry confirms that
                        MOM-000117 was once associated
                        with an authorized employee record.
                    </p>

                    <p>
                        The identity connected to that number
                        was deliberately removed from
                        standard personnel systems.
                    </p>

                    <p class="muted">
                        Further information has been classified.
                    </p>

                </div>


                <div class="terminal">CASE: CASE-002
SUBJECT: MOM-000117

REPORT: ACCEPTED
CASE STATUS: SOLVED

KNOWN FACT:
PERSONNEL IDENTITY WAS REMOVED

UNKNOWN:
WHO ORDERED THE ORIGINAL ERASURE
WHY THE CREDENTIAL REMAINS ACTIVE
WHAT OCCURRED IN SUB-LEVEL 4

DAY 3 ASSIGNMENT: COMPLETE

FURTHER ACCESS: RESTRICTED</div>


                <div class="center">

                    <button
                        class="btn"
                        onclick="showDashboard()">

                        RETURN TO OFFICE

                    </button>

                </div>

            </section>
        `;


        return;
    }


    /* =====================================================
       CASE-006 REVIEW TIMING
    ===================================================== */

    if(
        caseId ===
        "CASE-006"
    ){

        localStorage.setItem(
            "case006SubmittedDay",
            String(
                World.getDay()
            )
        );
    }


    /* =====================================================
       STANDARD REVIEW FLOW
    ===================================================== */

    Player.setCaseStatus(
        caseId,
        "Under Review"
    );


    app.innerHTML = `
        <section class="panel">

            <div class="seal">
                REPORT SUBMITTED
            </div>

            <h1>
                Report Received
            </h1>

            <h2>
                ${caseId}
            </h2>


            <div class="notice">

                <p>
                    Your investigation report has been submitted
                    to the Archive Division.
                </p>

                <p class="muted">
                    Senior staff will review your findings.
                </p>

            </div>


            <div class="terminal">REPORT STATUS: SUBMITTED
CASE: ${caseId}
ARCHIVE DIVISION REVIEW: PENDING</div>


            <div class="center">

                <button
                    class="btn"
                    onclick="openCase('${caseId}')">

                    RETURN TO CASE

                </button>


                <button
                    class="btn"
                    onclick="showDashboard()">

                    RETURN TO OFFICE

                </button>

            </div>

        </section>
    `;
}
