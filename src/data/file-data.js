export const files = [
  {
    id: "1",
    name: "Meeting Transcriptions",
    status: "healthy",
    fileType: "ingestion",
  },
  {
    id: "2",
    name: "Task Management",
    files: [
      {
        id: "3",
        name: "Capture Notes",
        status: "unknown",
        fileType: "ingestion",
      },
      {
        id: "4",
        name: "Task Enrichment",
        status: "unhealthy",
        fileType: "retrieval",
      },
      {
        id: "5",
        name: "Utilities",
        files: [
          {
            id: "6",
            name: "Task Lookup",
            fileType: "code",
          },
        ],
      },
    ],
  },
];
