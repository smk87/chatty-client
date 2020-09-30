import React from 'react';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
    useMutation,
} from '@apollo/client';
import { Container, Row, Col, FormInput, Button } from 'shards-react';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

const POST_MESSAGE = gql`
    mutation($user: String!, $content: String!) {
        postMessage(user: $user, content: $content)
    }
`;

const GET_MESSAGES = gql`
    query {
        messages {
            id
            user
            content
        }
    }
`;

const Messages = ({ user }) => {
    const { data } = useQuery(GET_MESSAGES, {
        pollInterval: 500,
    });

    if (!data) {
        return null;
    }

    return (
        <>
            {data.messages.map(({ id, user: messageUser, content }) => {
                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent:
                                user === messageUser
                                    ? 'flex-end'
                                    : 'flex-start',
                            paddingBottom: '1rem',
                        }}
                    >
                        {user !== messageUser && (
                            <div
                                style={{
                                    height: 50,
                                    width: 50,
                                    marginRight: '0.5em',
                                    border: '2px solid #e5e6ea',
                                    borderRadius: 25,
                                    textAlign: 'center',
                                    fontSize: '18pt',
                                    paddingTop: 5,
                                }}
                            >
                                {messageUser.slice(0, 2).toUpperCase()}
                            </div>
                        )}
                        <div
                            style={{
                                background:
                                    user === messageUser
                                        ? '#58bf56'
                                        : '#e5e6ea',
                                color: user === messageUser ? 'white' : 'black',
                                padding: '1rem',
                                borderRadius: '1rem',
                                maxWidth: '60%',
                            }}
                        >
                            {content}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

const Chat = () => {
    const [state, setState] = React.useState({
        user: 'Jack',
        content: '',
    });
    const [postMessage] = useMutation(POST_MESSAGE);

    const onSend = () => {
        if (state.content.length > 0) {
            postMessage({
                variables: state,
            });
        }

        setState({
            ...state,
            content: '',
        });
    };

    return (
        <Container>
            <Messages user="Jack" />
            <Row>
                <Col xs={2} style={{ padding: 0 }}>
                    <FormInput
                        label="User"
                        value={state.user}
                        onChange={(evt) =>
                            setState({
                                ...state,
                                user: evt.target.value,
                            })
                        }
                    />
                </Col>
                <Col xs={8} style={{ paddingLeft: '2rem' }}>
                    <FormInput
                        label="Content"
                        value={state.content}
                        onChange={(evt) =>
                            setState({
                                ...state,
                                content: evt.target.value,
                            })
                        }
                        onKeyUp={(evt) => {
                            if (evt.keyCode === 13) {
                            }
                        }}
                    />
                </Col>
                <Col xs={2} style={{ paddingLeft: '2rem' }}>
                    <Button onClick={onSend}>Send</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default () => (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
);
