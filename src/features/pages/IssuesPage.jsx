import React from "react";
import { useIssues } from "../hooks/useIssues";
import { IssuesList } from "../components/IssuesList";
import { Loader } from "../../shared/ui/Loader/Loader";


export function IssuesPage() {
    const { data, loading, error } = useIssues();


    if (loading) return <Loader />;
    if (error) return <div>Failed to load issues</div>;


    return <IssuesList issues={data.content} />;
}