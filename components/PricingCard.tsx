"use client"

import { Paper, Button} from "@mantine/core";
import { IconCheck } from '@tabler/icons-react';
import { List } from '@mantine/core';


interface PricingCardProps{
    title: string;
    price: number;
    features: string[];
    className?: string;

}

export default function PricingCard({
    title,
    price,
    features,
    className
}: PricingCardProps){
    return (
        <Paper className={className} >
            <div className="p-6 bg-slate-200 rounded-md shadow-sm space-y-4 m-2 h-80">
                <h2 className="text-2xl font-bold">{title}</h2>
                <p className="text-xl">${price}/month</p>
                <List
                    size="sm"
                    spacing="sm"
                    icon={
                        <IconCheck size={12}/>
                    }
                    >
                    {features.map((feature, index) => (
                        <List.Item key={index}>{feature}</List.Item>
                    ))}
                </List>
                <Button className="mt-20" variant="filled" color="blue">Get Started</Button>
            </div>
        </Paper>



    )



}