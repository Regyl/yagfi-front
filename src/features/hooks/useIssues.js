import {useEffect, useState} from "react";
import {fetchIssues} from "../../api/issuesApi";

export function useIssues() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIssues({
            page: 0,
            size: 1000,
            filter: { language: "Java" },
            order: { field: "stars", type: "desc" },
        })
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    return { data, loading };
}
