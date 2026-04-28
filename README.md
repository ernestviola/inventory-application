# An inventory application

## Architecture

The system was intended to be used by a non-authenticated user to add categories, and to add items to that category.

If a category is deleted then all items will be cascadingly deleted as well.

The pattern for this system is MVC and we're hosting our application and database on Google Cloud Platform. The server is sitting on a container in Cloud Run and the database on Cloud SQL.

### System Design

```mermaid
flowchart LR
  client[Client Browser]


  subgraph gcp[☁️ Google Cloud Platform]
    subgraph gcr[Google Cloud Run]
      express[Express Server]
    end
    subgraph gsql[Google SQL]
      db[(PostgreSQL DB)]
    end
  end

  client <-->|HTTPS| express
  express <-->|Google Private Network| db



  style db fill:#336791,stroke:#1a3a52,color:#fff
  style express fill:#68a063,stroke:#2d5016,color:#fff
```

### Database Schema

```mermaid
erDiagram
  direction LR
  CATEGORY ||--o{ITEM : ""

  CATEGORY {
    int id PK
    varchar name
    text imageUrl
  }

  ITEM {
    int id PK
    varchar name
    int quantity
    float price
    text imageUrl
    int category_id FK
  }
```

## Installation

After setting the .env variables the project can be ran with
`npm install` then `npm run dev`
