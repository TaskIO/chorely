export const getGroupTasksWithBounties = groupId => (
  `query={
    groups(id: ${groupId}) {
      tasks {
        id
        description
        status
        bounties {
          id
          amount
          user_id
        }
      }
    }
  }
  `
)
