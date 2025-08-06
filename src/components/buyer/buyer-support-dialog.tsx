
'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Loader2, LifeBuoy, Send, Bot, User, CheckCircle } from 'lucide-react';
import { handleBuyerQuery } from '@/ai/flows/buyer-support-flow';
import { Card, CardContent, CardDescription as CardDescriptionComponent, CardFooter, CardHeader, CardTitle as CardTitleComponent } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { createSupportTicket } from '@/app/actions';

type Message = {
    role: 'user' | 'bot';
    text: string;
    requiresFollowUp?: boolean;
    ticketCreated?: boolean;
}

const SupportChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: 'Hello! How can I help you with your campaign or payment today?' }
    ]);
    const [query, setQuery] = useState('');
    const [isPending, startTransition] = useTransition();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleTicketCreation = (problem: string) => {
        startTransition(async () => {
            // In a real app, the user's email would come from their session.
            const result = await createSupportTicket(problem, { role: 'Buyer', email: 'buyer@example.com' });
            if (result.success) {
                 setMessages(prev => [
                    ...prev, 
                    { role: 'bot', text: `I've successfully created support ticket #${result.ticketId}. Our team will review it and get back to you shortly.`, ticketCreated: true }
                ]);
            } else {
                 setMessages(prev => [
                    ...prev, 
                    { role: 'bot', text: `I'm sorry, but I was unable to create a support ticket at this moment. Please try again later. Error: ${result.error}`, ticketCreated: false }
                ]);
            }
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const userMessage: Message = { role: 'user', text: query };
        setMessages(prev => [...prev, userMessage]);
        const currentQuery = query;
        setQuery('');

        startTransition(async () => {
            const result = await handleBuyerQuery({ query: currentQuery });
            const botMessage: Message = { role: 'bot', text: result.answer, requiresFollowUp: result.requiresFollowUp };
            setMessages(prev => [...prev, botMessage]);
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    Contact Support
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg p-0">
                 <DialogHeader className="sr-only">
                    <DialogTitle>AI Buyer Support</DialogTitle>
                    <DialogDescription>Chat with an AI assistant to get help with buyer-related questions.</DialogDescription>
                 </DialogHeader>
                 <Card className="flex flex-col h-full w-full shadow-none border-none">
                    <CardHeader>
                        <CardTitleComponent className="flex items-center gap-2">
                            <Bot />
                            <span>AI Buyer Support</span>
                        </CardTitleComponent>
                        <CardDescriptionComponent>
                            Ask our AI assistant about campaigns and payments.
                        </CardDescriptionComponent>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-y-auto pr-4 space-y-4 h-96">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                {msg.role === 'bot' && <div className="bg-primary text-primary-foreground rounded-full p-2"><Bot size={16} /></div>}
                                <div className={`rounded-lg px-3 py-2 max-w-sm ${msg.role === 'user' ? 'bg-secondary' : 'bg-muted'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                     {msg.requiresFollowUp && !msg.ticketCreated && (
                                        <Button
                                            size="sm"
                                            className="mt-2"
                                            onClick={() => handleTicketCreation(messages[index -1].text)}
                                            disabled={isPending}
                                        >
                                            {isPending ? (
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            ) : (
                                                'Create Support Ticket'
                                            )}
                                        </Button>
                                    )}
                                </div>
                                {msg.role === 'user' && <div className="bg-secondary rounded-full p-2"><User size={16} /></div>}
                            </div>
                        ))}
                        {isPending && !messages[messages.length-1].ticketCreated && (
                            <div className="flex items-start gap-3">
                                <div className="bg-primary text-primary-foreground rounded-full p-2"><Bot size={16} /></div>
                                <div className="rounded-lg px-3 py-2 bg-muted flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <p className="text-sm">Thinking...</p>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </CardContent>
                    <CardFooter>
                        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                            <Input 
                                value={query} 
                                onChange={(e) => setQuery(e.target.value)} 
                                placeholder="Type your question..." 
                                disabled={isPending}
                            />
                            <Button type="submit" disabled={isPending || !query.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    );
};

export { SupportChat as BuyerSupportDialog };
