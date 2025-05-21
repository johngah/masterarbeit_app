let conversation = [];

export const getConversation = () => conversation;

export const addUserMessage = (messageText) => {
    conversation.push({
        role: "user",
        content: [
            {
                type: "input_text",
                text: messageText,
            },
        ],
    });
};

export const addAssistantMessage = (messageText) => {
    conversation.push({
        role: "assistant",
        content: [
            {
                type: "output_text",
                text: messageText,
            },
        ],
    });
};

export const resetConversation = () => {
    conversation = [];
};
