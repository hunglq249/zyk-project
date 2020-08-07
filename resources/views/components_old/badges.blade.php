@extends('layouts.client')

@section('page_title')
    Badges
@endsection

@section('view')
    <div class="container-fluid">
        <div class="section section-buttons">
            <div class="section-header">
                <h3>Badges</h3>
            </div>

            <div class="section-body">
                <div class="row">
                    <div class="col-12">
                        <span class="badge badge-default">Badge Default</span>
                        <span class="badge badge-primary">Badge Primary</span>
                        <span class="badge badge-secondary">Badge Secondary</span>
                        <span class="badge badge-success">Badge Success</span>
                        <span class="badge badge-warning">Badge Warning</span>
                        <span class="badge badge-danger">Badge Danger</span>
                        <span class="badge badge-info">Badge Info</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection