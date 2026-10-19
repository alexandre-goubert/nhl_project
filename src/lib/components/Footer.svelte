<footer>
    <div class="footer-title">NHL <span>Zone</span></div>
    <div class="footer-menu">
        <p>Site de fans indépendant</p>
        <p>Non affilié à la NHL</p>
    </div>
</footer>

<style>
    footer {
        display: flex;
        justify-content: space-between;
        padding: 50px;
        background-color: #101C30;
        border-top: 1px solid #39BDE0;
        box-sizing: border-box;
    }

    .footer-title {
        color: white;
        font-size: 40px;
        font-weight: 800;
        text-transform: uppercase;
    }

    .footer-title span {
        color: #39BDE0;
        font-weight: 800;
    }

    .footer-menu {
        display: flex;
        gap: 30px;
        color: white;
        font-weight: 700;
    }

    .footer-menu p {
        margin: 0;
    }

    @media (max-width: 768px) {
        footer {
            flex-direction: column;
            align-items: center;
            gap: 16px;
            padding: 28px 16px;
            text-align: center;
        }

        .footer-title {
            font-size: 30px;
        }

        .footer-menu {
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px 16px;
        }
    }
</style>
